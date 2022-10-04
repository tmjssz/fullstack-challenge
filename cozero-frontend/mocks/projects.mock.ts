import { Project } from "../interfaces/project.interface"

export const projectsMock: Project[] = [
    {
        id: '1',
        name: 'Project 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.',
        listing: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.',
            'Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.'
        ],
        owner: 'John Doe',
        createdAt: String(new Date()),
        co2EstimateReduction: [100, 200],
        updatedAt: String(new Date()),
    },
    {
        id: '2',
        name: 'Project 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.',
        listing: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.',
            'Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.'
        ],
        owner: 'Doe Iks',
        createdAt: String(new Date()),
        co2EstimateReduction: [50, 600],
        updatedAt: String(new Date()),
    },

]
