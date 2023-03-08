// import sanityClient, { SanityClient } from "@sanity/client";
// import imageUrlBuilder from "@sanity/image-url";

// const client = sanityClient({
//     projectId: "tlhop7qq",
//     dataset: "production",
//     useCdn: true,
//     apiVersion: "2021-10-21",
// });

// const builder = imageUrlBuilder(client);
// export const urlFor = (source) => builder.image(source);

// export default client;

// import { SanityClient } from "sanity";
// import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import ImageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";

const client = sanityClient ({
    projectId: "tlhop7qq",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21",
}); 

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;