import { Favorite } from "@db/entity/Favorite";
import { Giphy } from "@db/entity/Giphy";
import { User } from "@db/entity/User";
import { Gif } from "@type/GifResponse.type";
import { RequestContext } from "@type/RequestContext.type";
import { GIPHY_KEY } from "@util/secrets";
import axios from "axios";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver
} from "type-graphql";

@InputType()
class Request {
  @Field(type => [String])
  gifIDs: string[];
}

@InputType()
class GifInput {
  @Field()
  id: string;
  rating: string;
}

@Resolver()
export class GifResolver {
  @Query(() => [Gif])
  async findGif(@Arg("search") search: string) {
    const limit = 25;
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${search}&limit=${limit}&offset=0&rating=G&lang=en`
    );

    return response.data.data;
  }

  @Query(() => [Gif])
  async getGifsByID(
    @Arg("data")
    data: Request
  ) {
    try {
      const ids = data.gifIDs.join(",");
      const response = await axios.get(
        `http://api.giphy.com/v1/gifs?api_key=${GIPHY_KEY}&ids=${ids}`
      );

      return response.data.data;
    } catch (e) {
      console.error(e);
      return e.message;
    }
  }

  @Mutation(type => Gif)
  async createGiphy(@Arg("data") data: GifInput) {
    const { id, rating } = data;
    const newGiphy = Giphy.create({ id, rating });
    await newGiphy.save();

    return newGiphy;
  }

  @Mutation(() => [Favorite])
  @Authorized()
  async addFavorite(
    @Arg("data") data: Request,
    @Ctx() context: RequestContext
  ) {
    const user = await User.findOneOrFail(context.req.session!.userID);
    const response: Gif[] = await Promise.all(
      data.gifIDs.flatMap(gifID => {
        return this.getGifsByID({ gifIDs: [gifID] });
      })
    );

    await response.flat().forEach(async gif => {
      const { id, rating } = gif;
      const giphy = await this.createGiphy({ id, rating });

      await Favorite.create({
        userID: user.id,
        giphyID: giphy.id
      }).save();
    });

    const favorites = await Favorite.find({
      relations: ["user", "giphy"],
      where: { userID: user.id }
    });

    return favorites;
  }
}
