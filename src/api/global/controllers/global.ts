/**
 *  global controller
 */

import { factories } from '@strapi/strapi';


export default factories.createCoreController('api::global.global', ({ strapi }) => ({
    async find(ctx) {
        const locale = ctx.query.locale || 'en';
        const entity = await strapi.db.query('api::global.global').findOne({
            where: { locale },
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
