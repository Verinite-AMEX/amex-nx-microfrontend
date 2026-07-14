import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

import {
  UserManagement
} from '../models/user-management.model';

import {
  MOCK_OMS_USERS
} from '../mock-data/mock-oms-users';

@Injectable({
  providedIn: 'root'
})
export class OmsUserManagementService {

  private STORAGE_KEY =
    'oms_users';

  private usersSubject =
    new BehaviorSubject<
      UserManagement[]
    >([]);

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

      localStorage.setItem(

        this.STORAGE_KEY,

        JSON.stringify(
          MOCK_OMS_USERS
        )
      );

      this.usersSubject.next(
        MOCK_OMS_USERS
      );
    }
  }

  private saveUsers(
    users: UserManagement[]
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

  addUser(
    user: UserManagement
  ) {

    const currentUsers =
      this.usersSubject.value;

    const updatedUsers = [

      ...currentUsers,

      user
    ];

    this.saveUsers(
      updatedUsers
    );

    console.log(
      'User Added'
    );
  }

  updateUser(
    updatedUser:
      UserManagement
  ) {

    const updatedUsers =
      this.usersSubject.value.map(
        user =>

          user.userId ===
          updatedUser.userId

            ? updatedUser

            : user
      );

    this.saveUsers(
      updatedUsers
    );

    console.log(
      'User Updated'
    );
  }

  deleteUser(
    userId: string
  ) {

    const updatedUsers =
      this.usersSubject.value.filter(
        user =>

          user.userId !== userId
      );

    this.saveUsers(
      updatedUsers
    );

    console.log(
      'User Deleted'
    );
  }

  clearUsers() {

    localStorage.removeItem(
      this.STORAGE_KEY
    );

    this.usersSubject.next([]);
  }
}