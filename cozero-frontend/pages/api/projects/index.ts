// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt';
import jwt from 'jwt-simple';
import { Project } from '../../../interfaces/project.interface';
import HTTPService from '../../../services/HTTPService';
import { BACKEND_URL } from '../../../constants/backend.constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | undefined>
) {
  if (req.method !== 'GET') {
    res.status(405).end('Method not allowed')
    return
  }
  const projects = await HTTPService.get<Project[]>(`${BACKEND_URL}projects`)

  res.status(200).json(projects)
}
