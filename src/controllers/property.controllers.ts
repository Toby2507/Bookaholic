import { createClubInput, createReservationInput, createStayInput } from '@schemas';
import { createClub, createEstablishmentStay, createRestaurant, createUserStay } from '@services';
import { asyncWrapper } from '@utils';
import { Request, Response } from 'express';

export const createStayHandler = asyncWrapper(async (req: Request<{}, {}, createStayInput>, res: Response) => {
  const { id, type } = res.locals.user;
  const data = { ...req.body, partner: id };
  const stay = type === 'USER' ? await createUserStay(data) : await createEstablishmentStay(data);
  return res.status(201).json({ stay });
});

export const createRestaurantHandler = asyncWrapper(
  async (req: Request<{}, {}, createReservationInput>, res: Response) => {
    const { id } = res.locals.user;
    const data = { ...req.body, establishment: id };
    const reservation = await createRestaurant(data);
    return res.status(201).json({ reservation });
  }
);

export const createClubHandler = asyncWrapper(async (req: Request<{}, {}, createClubInput>, res: Response) => {
  const { id } = res.locals.user;
  const data = { ...req.body, establishment: id };
  const reservation = await createClub(data);
  return res.status(201).json({ reservation });
});