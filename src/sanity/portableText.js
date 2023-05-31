
import { portableTextToHtml,uriLooksSafe } from 'astro-sanity';
import { urlForImage } from './urlForImage';

const customComponents = {
  types: {
    image: ({ value }) => {
      return `
        <picture>
          <source
            srcset="${urlForImage(value.asset).format('webp').url()}"
            type="image/webp"
          />
          <img
            class="responsive__img"
            src="${urlForImage(value.asset).url()}"
            alt="${value.alt}"
          />
        </picture>
      `;
    }
  },
  marks: {
    link: ({ children, value }) => {
     
        const href = value.href;
        const rel = href.startsWith('/') ? undefined : 'noreferrer noopener'
        return `<a class="text-base-normal underline" href="${href}" rel="${rel}">${children}</a>`
    
    }
    
  }
};

export function sanityPortableText(portabletext) {
  return portableTextToHtml(portabletext, customComponents);
}