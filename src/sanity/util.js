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

export async function getServices() {
    const servicesQuery = `
       *[_type=="serviceExcerpt"]
    `;
    return await useSanityClient().fetch(servicesQuery);
}

export async function getTechnologies() {
    const technlogiesQuery = `
       *[_type=='technologiesSection']{
			title,
			intro,
			closingThoughts,
			technologies[]{
				name,
				techType->{name},
				icon{asset->{url}}
			},
			sectionIcon}[0]
    `;
    return await useSanityClient().fetch(technlogiesQuery);
}

export async function getFullBiography() {
    const bioQuery = `
    *[_type=='biography'][0]{
            full_bio,
			photo{asset->{url}},
			resume{asset->{url}},
        }`;
    
    return await useSanityClient().fetch(bioQuery);
}

export async function getProjects() {
    const projectsQuery = `
        *[_type=="project"]
    `;
    
    return await useSanityClient().fetch(projectsQuery);
}