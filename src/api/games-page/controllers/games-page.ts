/**
 * games-page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::games-page.games-page', ({ strapi }) => ({    
    async find() {
        const entity = await strapi.documents('api::games-page.games-page').findFirst({
            status: 'published', // Only fetch published data, not draft
            populate: {
                blocks: {
                    on: {
                        'layout.hero-trailer-section': {
                            populate: {
                               downloadButton: true, 
                            }
                        },
                        'layout.media-gallery-section': {},
                        'layout.about': {
                            populate: {
                                title: true,
                                description: true,
                            }
                        },
                        'layout.news-letter-form': {},
                        'layout.cta-section': {
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