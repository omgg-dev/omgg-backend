/**
 * game controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::game.game', ({ strapi }) => ({
    
    async findFirst(ctx) {
        const { slug } = ctx.params;
        const locale: string = ctx.request.query.locale as string;
        console.log(`[Game]: locale -> ${locale}`);
        const entity = await strapi.documents('api::game.game').findFirst({
            locale,
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