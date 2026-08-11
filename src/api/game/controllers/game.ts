/**
 * game controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::game.game', ({ strapi }) => ({
    
    async findFirst(ctx) {
        const { slug } = ctx.params;
        const entity = await strapi.documents('api::game.game').findFirst({
            filters: {
                slug: {
                    $eq: slug
                }
            },
            populate: {
                gallery: {
                    populate: {
                        assets: true,
                    }
                },
                platforms: {
                    populate: {
                        icon: true,
                    }
                },
                download: {
                    populate: {}
                },
                genrers:   true,
                background: true,
                description: true,
                pngIllustration: true,
            }
        })

        return { data: entity };
    },
}));