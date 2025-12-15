/**
 * legal-document controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::legal-document.legal-document', ({ strapi }) => ({
    async findFirst(ctx) {
        const { slug } = ctx.params;

        const locale: string = ctx.request.query.locale as string;

        const entity = await strapi.documents('api::legal-document.legal-document').findFirst({
            locale,
            filters: {
                slug: {
                    $eq: slug
                }
            }
        })

        return { data: entity };
    },
}));
