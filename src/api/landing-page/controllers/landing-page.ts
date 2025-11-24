/**
 * landing-page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::landing-page.landing-page', ({ strapi }) => ({
    async find(ctx) {
        const locale: string = ctx.request.query.locale as string;
        const entity = await strapi.documents('api::landing-page.landing-page').findFirst({
            status: 'published', // Only fetch published data, not draft
            locale,
            populate: {
                blocks: {
                    on: {
                        'layout.hero-section': {
                            populate: {
                                logo: true,
                                buttons: true,
                                badge: true,
                                title: true,
                                subtitle: true,
                            }
                        },
                        'layout.about': {
                            populate: {
                                callToAction: true,
                                title: true,
                                description: true,
                                text: true,
                            }
                        },
                        'layout.offers': {
                            populate: {
                                cards: {
                                    populate: {
                                        callToAction: true,
                                    },
                                },
                            }
                        },
                        'layout.partners': {
                            populate: {
                                title: true,
                            }
                        },
                        'layout.testimonials-section': {},
                        'layout.blog-section': {},
                        'layout.news-letter-form': {},
                    }
                }
            }
        })

        return { data: entity };
    }
}));
