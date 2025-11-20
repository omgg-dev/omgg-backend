/**
 * games-page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::games-page.games-page', ({ strapi }) => ({    
    async find(ctx) {
        const locale = ctx.query.locale || 'en';
        const entity = await strapi.db.query('api::games-page.games-page').findOne({
            where: { locale },
            populate: {
                blocks: {
                    on: {
                        'layout.hero-trailer-section': {
                            populate: {
                               downloadButton: true, 
                            }
                        },
                        "layout.media-gallery-section": {
                            populate: {}
                        },
                        "layout.about": {
                            populate: {
                                title: true,
                                description: true,
                            }
                        },
                        "layout.news-letter-form": {
                            populate: {}
                        },
                        "layout.cta-section": {
                            populate: {
                                title: true,
                                description: true,
                                downloadButton: true,
                                image: true,
                            }
                        }
                    }
                }
            }
        })

        return { data: entity }
    }
}))