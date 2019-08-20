import { Gif } from "@type/GifResponse.type";
import { GIPHY_KEY } from "@util/secrets";
import axios from "axios";
import { Arg, Field, InputType, Query, Resolver } from "type-graphql";

@InputType()
class Request {
  @Field(type => [String])
  gifIDs: string[];
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
    @Arg("request")
    request: Request
  ) {
    try {
      const ids = request.gifIDs.join(",");
      const response = await axios.get(
        `http://api.giphy.com/v1/gifs?api_key=${GIPHY_KEY}&ids=${ids}`
      );

      return response.data.data;
    } catch (e) {
      console.error(e);
      return e.message;
    }
  }
}
