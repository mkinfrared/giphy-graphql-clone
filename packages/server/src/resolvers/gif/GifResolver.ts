import { Gif } from "@type/GifResponse.type";
import { GIPHY_KEY } from "@util/secrets";
import axios from "axios";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class GifResolver {
  @Query(() => [Gif])
  async findGif(@Arg("search") search: string) {
    const limit = 25;
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${search}&limit=${limit}&offset=0&rating=G&lang=en`
    );
    const data: [Gif] = response.data.data;

    return data;
  }
}
