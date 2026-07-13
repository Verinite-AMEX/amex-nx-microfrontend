import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MrmUserManagementService {

  private STORAGE_KEY =
    'mrm_users';

  private usersSubject =
    new BehaviorSubject<any[]>([]);

  users$ =
    this.usersSubject
      .asObservable();

  constructor() {

    this.loadUsers();
  }

  private loadUsers() {

    const storedUsers =
      localStorage.getItem(
        this.STORAGE_KEY
      );

    if (storedUsers) {

      this.usersSubject.next(
        JSON.parse(storedUsers)
      );

    } else {

      const mockUsers = [

        {
          id: 1,

          userId:
            'mrmadmin',

          userName:
            'Essa',

          emailAddress:
            'essa@test.com',

          creationDate:
            '01/01/2026',

          status:
            'Active'
        }
      ];

      localStorage.setItem(

        this.STORAGE_KEY,

        JSON.stringify(
          mockUsers
        )
      );

      this.usersSubject.next(
        mockUsers
      );
    }
  }

  private saveUsers(
    users: any[]
  ) {

    localStorage.setItem(

      this.STORAGE_KEY,

      JSON.stringify(users)
    );

    this.usersSubject.next(
      users
    );
  }

  getUsers() {

    return this.users$;
  }

  addUser(user: any) {

    const updatedUsers = [

      ...this.usersSubject.value,

      user
    ];

    this.saveUsers(
      updatedUsers
    );
  }

  updateUser(
    updatedUser: any
  ) {

    const updatedUsers =
      this.usersSubject.value.map(
        user =>

          user.id ===
          updatedUser.id

            ? {

                ...user,

                ...updatedUser
              }

            : user
      );

    this.saveUsers(
      updatedUsers
    );
  }

  deleteUser(id: number) {

    const updatedUsers =
      this.usersSubject.value.filter(
        user =>

          user.id !== id
      );

    this.saveUsers(
      updatedUsers
    );
  }
}