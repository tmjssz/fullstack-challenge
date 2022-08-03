// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt';
import jwt from 'jwt-simple';
import { BACKEND_URL } from '../../../constants/backend.constants';
import { UpdateProjectDto } from '../../../interfaces/project.interface';
import HTTPService from '../../../services/HTTPService';

function deleteProject(projectId: string,jwtToken: string) {
  return HTTPService.delete(`${BACKEND_URL}projects/${projectId}`, jwtToken)
}

function updateProject(projectId: string, data: UpdateProjectDto, jwtToken: string) {
  return HTTPService.put(`${BACKEND_URL}projects/${projectId}`, data, jwtToken)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {

  // Reject non-allowed methods
  if (!['PUT','DELETE'].includes(req.method as string)) {
    res.status(405).end('Method not allowed')
    return
  }

  const secret = process.env.NEXTAUTH_SECRET as string
  const token = await getToken({ req, secret });
  const jwtToken = jwt.encode(token, secret, 'HS512');

  //Update project
  if (req.method === 'PUT') {
    const projectId = req.query.id as string
    const updatedProject = await updateProject(projectId, req.body, jwtToken)
    res.status(200).json(updatedProject)
    return
  }

  //Delete project
  const deletedProject = await deleteProject(req.query.id as string, jwtToken)
  res.status(200).json(deletedProject)
}
