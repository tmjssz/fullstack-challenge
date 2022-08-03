// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt';
import jwt from 'jwt-simple';
import { Project } from '../../../interfaces/project.interface';
import HTTPService from '../../../services/HTTPService';
import { BACKEND_URL } from '../../../constants/backend.constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project | undefined>
) {

  if (req.method !== 'POST') {
    res.status(405).end('Method not allowed')
    return
  }

  const secret = process.env.NEXTAUTH_SECRET as string
  const token = await getToken({ req, secret });
  const jwtToken = jwt.encode(token, secret, 'HS512');

  const createdProject = await HTTPService.post<Project>(`${BACKEND_URL}projects/create/`, {
    createProjectDto: req.body
  }, jwtToken)

  res.status(200).json(createdProject)
}
