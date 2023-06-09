import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { MealRepository } from '../../repository/Meal/MealRepository';
import { DeleteMealUseCase } from '../../useCases/Meal/DeleteMealUseCase';

async function deleteMealController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const deleteBodySchema = z.object({
        mealId: z.string(),
    });

    const userId = request.user.sub;
    const { mealId } = deleteBodySchema.parse(request.params);

    try {
        const mealRepository = new MealRepository();

        const deleteMealUseCase = new DeleteMealUseCase(mealRepository);
        const { meal } = await deleteMealUseCase.execute({
            userId,
            id: mealId,
        });

        return reply.status(200).send({
            meal,
        });
    } catch (err: any) {
        return reply.status(400).send({ message: err.message });
    }
}
export { deleteMealController };
