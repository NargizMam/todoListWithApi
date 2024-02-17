export interface RegisterUser {
    username: string;
    password: string;
    token: string
}

export interface TaskMutation {
    title: string;
    description: string;
    status:  'new' | 'in_progress' | 'complete';

}
export interface TaskApi extends TaskMutation{
    id: string;
    user: string;
}