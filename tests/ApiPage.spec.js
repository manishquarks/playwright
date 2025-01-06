import { test, expect } from '@playwright/test';
import ApiPage from '../pageobjects/ApiPage';
import { UserData } from '../config/constant-config';

test('Create a new user and validate using GET API', async ({ page }) => {
  const apiPage = new ApiPage(page);

  //create a new user
  const userData = {
    email: UserData.EMAIL,
    password: UserData.PASSWORD
  };

  //Create a new user and get the created user's ID
  const createdUser = await apiPage.createUser(userData);
  const createdUserId = createdUser.id;

  console.log("Created User ID: ", createdUserId);

  // Get the list of users
  const users = await apiPage.getUsers();
  // Check if the created user is in the list of users
  const userExists = users.some(user => user.id === createdUserId);
  expect(userExists).toBe(true); // check user is present in the list

  // Validate that the user's details are correct using the ID
  const userById = await apiPage.getUserById(createdUserId);
//   console.log(userById,'userById')
  expect(userById.email).toBe(UserData.EMAIL);
  expect(userById.first_name).toBe(UserData.FIRST_NAME);
  expect(userById.last_name).toBe(UserData.LAST_NAME);
});
