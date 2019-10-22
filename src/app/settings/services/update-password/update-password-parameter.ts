export interface UpdatePasswordParameter {
    idUser: number;
    currentPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
}
