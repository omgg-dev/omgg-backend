/**
 *  global controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::global.global', ({ strapi }) => ({
    async find(ctx) {
        const entity = await strapi.db.query('api::global.global').findOne({
            populate: {
                navbar: {
                    populate : {
                        logo: {
                            populate: {
                                image: true
                            }
                        },
                        dropdowns: {
                            populate: {
                                items: true
                            }
                        },
                        linkButtons: true
                    }
                },
                footer: {
                    populate : {
                        iconsLink: true,
                        menu: true,
                        legal: true
                    }
                },
                favicon: true
            }
        });

        return { data: entity };
    }
}));
