import { useSanityClient } from "astro-sanity";
export async function getBiography() {
    const bioQuery = `
    *[_type=='biography']{
                    short_bio,
                    photo{asset->{url}},
                    resume{asset->{url}},
                }[0]
    `;
    return await useSanityClient().fetch(bioQuery);
}

export async function getSocialLinks() {
    const socialLinksQuery = `
        *[_type=='socialInfoItem']
    `;
    return await useSanityClient().fetch(socialLinksQuery);
}