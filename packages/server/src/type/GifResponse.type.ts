/* tslint:disable:variable-name */
import { Field, ObjectType } from "type-graphql";

export type GifResponse = Gif[];

@ObjectType()
class ImageProperty {
  @Field()
  url: string;
  @Field()
  width: string;
  @Field()
  height: string;
  @Field()
  size: string;
  @Field()
  frames?: string;
  @Field()
  mp4?: string;
  @Field()
  mp4_size?: string;
  @Field()
  webp?: string;
  @Field()
  webp_size?: string;
  @Field()
  hash?: string;
}

@ObjectType()
class Image {
  @Field()
  fixed_height_still: ImageProperty;
  @Field()
  original_still: ImageProperty;
  @Field()
  fixed_width: ImageProperty;
  @Field()
  fixed_height_small_still: ImageProperty;
  @Field()
  fixed_height_downsampled: ImageProperty;
  @Field()
  preview: ImageProperty;
  @Field()
  fixed_height_small: ImageProperty;
  @Field()
  downsized_still: ImageProperty;
  @Field()
  downsized: ImageProperty;
  @Field()
  downsized_large: ImageProperty;
  @Field()
  fixed_width_small_still: ImageProperty;
  @Field()
  preview_webp: ImageProperty;
  @Field()
  fixed_width_still: ImageProperty;
  @Field()
  fixed_width_small: ImageProperty;
  @Field()
  downsized_small: ImageProperty;
  @Field()
  fixed_width_downsampled: ImageProperty;
  @Field()
  downsized_medium: ImageProperty;
  @Field()
  original: ImageProperty;
  @Field()
  fixed_height: ImageProperty;
  @Field()
  looping: ImageProperty;
  @Field()
  original_mp4: ImageProperty;
  @Field()
  preview_gif: ImageProperty;
}

@ObjectType()
export class Gif {
  @Field()
  type: string;
  @Field()
  id: string;
  @Field()
  slug: string;
  @Field()
  url: string;
  @Field()
  bitly_gif_url: string;
  @Field()
  bitly_url: string;
  @Field()
  embed_url: string;
  @Field()
  username: string;
  @Field()
  source: string;
  @Field()
  rating: string;
  @Field()
  content_url: string;
  @Field()
  source_tld: string;
  @Field()
  source_post_url: string;
  @Field()
  is_sticker: number;
  @Field()
  import_datetime: string;
  @Field()
  trending_datetime: string;
  @Field()
  images: Image;
  @Field()
  title: string;
  analytics: {
    onload: {
      url: string;
    };
    onclick: {
      url: string;
    };
    onsent: {
      url: string;
    };
  };
}
