/**
 *  global controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::global.global', ({ strapi }) => ({
    async find(ctx) {
        const locale: string = ctx.request.query.locale as string;
        const entity = await strapi.documents('api::global.global').findFirst({
            status: 'published', // Only fetch published data, not draft
            locale,
            populate: {
                navbar: {
                    populate: {
                        logo: true,
                        dropdowns: {
                            populate: {
                                items: {
                                    populate: {
                                        icon: true,
                                    }
                                }
                            }
                        },
                        linkButtons: true,
                    }
                },
                footer: {
                    populate: {
                        iconsLink: true,
                        menu: {
                            populate: {
                                textLinks: true,
                            }
                        }, 
                        legal: true,
                        logo: {
                            populate: {
                                image: true,
                            }
                        }
                    }
                },
                favicon: true,
            }
        });

        return { data: entity };
    }
}));
