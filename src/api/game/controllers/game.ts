/**
 * game controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::game.game', ({ strapi }) => ({
    
    async findOneBySlug(ctx) {
        const locale = ctx.query.locale || 'en';
        const { slug } = ctx.params;

        console.log("[findOneBySlug]");

        const entity = await strapi.db.query('api::game.game').findOne({
            where: { slug, locale },
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