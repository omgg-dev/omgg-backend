/**
 * landing-page controller
 */

import { factories } from '@strapi/strapi'
import { title } from 'process';

export default factories.createCoreController('api::landing-page.landing-page', ({ strapi }) => ({
    async find(ctx) {
        const locale = ctx.query.locale || 'en';
        const entity = await strapi.db.query('api::landing-page.landing-page').findOne({
            where: { locale },
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
                        "layout.about": {
                            populate: {
                                callToAction: true,
                                title: true,
                                description: true,
                                text: true,
                            }
                        },
                        "layout.offers": {
                            populate: {
                                cards: {
                                    populate: {
                                        callToAction: true,
                                    },
                                },
                            }
                        },
                        "layout.partners": {
                            populate: {
                                title: true,
                            }
                        },
                        "layout.testimonials-section": {},
                        "layout.blog-section": {
                            populate: {
                                title: true
                            }
                        },
                        "layout.news-letter-form": {
                            populate: {}
                        }
                    }
                }
            }
        })

        return { data: entity };
    }
}));
