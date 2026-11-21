import { test, expect } from "@playwright/test";

test.describe("Registration", () => {
  let id: number;

  test.beforeEach(async ({ page }) => {
    await page.goto("/user/sign_up");
    id = Date.now();
  });

  test("P - user can register with valid data", async ({ page }) => {
    await page.getByLabel("Username").fill(`user${id}`);
    await page.getByLabel("Email Address").fill(`hrytsyna.sph+${id}@gmail.com`);
    await page.getByLabel("Password", { exact: true }).fill("12345678");
    await page.getByLabel("Confirm Password", { exact: true }).fill("12345678");

    await page.getByRole("button", { name: "Register Account" }).click();

    await expect(
      page.getByText("Account was successfully created. Welcome!"),
    ).toBeVisible();
    await expect(page.getByLabel("root - Dashboard")).toBeDefined();
  });

  test("N - password and confirm password do not match", async ({ page }) => {
    await page.getByLabel("Username").fill(`user${id}`);
    await page.getByLabel("Email Address").fill(`hrytsyna.sph+${id}@gmail.com`);
    await page.getByLabel("Password", { exact: true }).fill("12345678");
    await page.getByLabel("Confirm Password", { exact: true }).fill("87654321");

    await page.getByRole("button", { name: "Register Account" }).click();

    await expect(page.getByText("The passwords do not match.")).toBeVisible();
  });

  test("N - password is less than 8 chars", async ({ page }) => {
    await page.getByLabel("Username").fill(`user${id}`);
    await page.getByLabel("Email Address").fill(`hrytsyna.sph+${id}@gmail.com`);
    await page.getByLabel("Password", { exact: true }).fill("1234567");
    await page.getByLabel("Confirm Password", { exact: true }).fill("1234567");

    await page.getByRole("button", { name: "Register Account" }).click();

    await expect(
      page.getByText("Password length cannot be less than 8 characters."),
    ).toBeVisible();
  });

  test("N - existing username", async ({ page }) => {
    const username = `test_user_${id}`;
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Email Address").fill(`hrytsyna.sph+${id}@gmail.com`);
    await page.getByLabel("Password", { exact: true }).fill("12345678");
    await page.getByLabel("Confirm Password", { exact: true }).fill("12345678");

    await page.getByRole("button", { name: "Register Account" }).click();

    await expect(
      page.getByText("Account was successfully created. Welcome!"),
    ).toBeVisible();

    await page.getByRole("menu", { name: "Profile and Settings…" }).click();
    await page.getByRole("menuitem", { name: "Sign Out" }).click();

    await page.goto("/user/sign_up");

    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Email Address").fill(`hrytsyna.sph+${id}@gmail.com`);
    await page.getByLabel("Password", { exact: true }).fill("12345678");
    await page.getByLabel("Confirm Password", { exact: true }).fill("12345678");

    await page.getByRole("button", { name: "Register Account" }).click();

    await expect(
      page.getByText("The username is already taken."),
    ).toBeVisible();
  });

  test("N - existing email", async ({ page }) => {
    const emailAddress = `hrytsyna.sph+${id}@gmail.com`;
    await page.getByLabel("Username").fill(`user${id}`);
    await page.getByLabel("Email Address").fill(emailAddress);
    await page.getByLabel("Password", { exact: true }).fill("12345678");
    await page.getByLabel("Confirm Password", { exact: true }).fill("12345678");

    await page.getByRole("button", { name: "Register Account" }).click();

    await expect(
      page.getByText("Account was successfully created. Welcome!"),
    ).toBeVisible();

    await page.getByRole("menu", { name: "Profile and Settings…" }).click();
    await page.getByRole("menuitem", { name: "Sign Out" }).click();

    await page.goto("/user/sign_up");

    await page.getByLabel("Username").fill(Date.now().toString());
    await page.getByLabel("Email Address").fill(emailAddress);
    await page.getByLabel("Password", { exact: true }).fill("12345678");
    await page.getByLabel("Confirm Password", { exact: true }).fill("12345678");

    await page.getByRole("button", { name: "Register Account" }).click();

    await expect(
      page.getByText("The email address is already used."),
    ).toBeVisible();
  });

  test("N - incorrect username", async ({ page }) => {
    await page.getByLabel("Username").fill("user@1");
    await page.getByLabel("Email Address").fill(`hrytsyna.sph+${id}@gmail.com`);
    await page.getByLabel("Password", { exact: true }).fill("12345678");
    await page.getByLabel("Confirm Password", { exact: true }).fill("12345678");

    await page.getByRole("button", { name: "Register Account" }).click();

    await expect(
      page.getByText(
        "Username can only contain alphanumeric characters ('0-9','a-z','A-Z'), dash ('-'), underscore ('_') and dot ('.'). It cannot begin or end with non-alphanumeric characters, and consecutive non-alphanumeric characters are also forbidden.",
      ),
    ).toBeVisible();
  });

  test("N - email w/o @", async ({ page }) => {
    await page.getByLabel("Username").fill(`user${id}`);

    const email = page.getByLabel("Email Address");
    await email.fill(`hrytsyna.sph+${id}gmail.com`);

    await page.getByLabel("Password", { exact: true }).fill("12345678");
    await page.getByLabel("Confirm Password", { exact: true }).fill("12345678");

    await page.getByRole("button", { name: "Register Account" }).click();

    await expect(page).toHaveURL(/\/user\/sign_up/);
    await expect(email).not.toHaveJSProperty("validationMessage", ""); //await expect(locator).toHaveJSProperty(propertyName, expectedValue);
  });

  test("N - empty fields", async ({ page }) => {
    const userName = page.getByLabel("Username");
    await page.getByRole("button", { name: "Register Account" }).click();

    await expect(page).toHaveURL(/\/user\/sign_up/);
    await expect(userName).not.toHaveJSProperty("validationMessage", ""); //await expect(locator).toHaveJSProperty(propertyName, expectedValue);
  });

  test("P - open signin page from the registration page", async ({ page }) => {
    await page.getByRole("link", { name: "Sign in now!" }).click();
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Register now." }),
    ).toBeVisible();
  });

  test("P - user can re-login", async ({ page }) => {
    const userNameRelogin = `user${id}`;
    const emailAddressRelogin = `hrytsyna.sph+${id}@gmail.com`;
    const passwordRelogin = "12345678";
    await page.getByLabel("Username").fill(userNameRelogin);
    await page.getByLabel("Email Address").fill(emailAddressRelogin);
    await page.getByLabel("Password", { exact: true }).fill(passwordRelogin);
    await page
      .getByLabel("Confirm Password", { exact: true })
      .fill(passwordRelogin);

    await page.getByRole("button", { name: "Register Account" }).click();

    await expect(
      page.getByText("Account was successfully created. Welcome!"),
    ).toBeVisible();

    await page.getByRole("menu", { name: "Profile and Settings…" }).click();
    await page.getByRole("menuitem", { name: "Sign Out" }).click();

    await page.getByRole("link", { name: "Sign In" }).click();

    await page.getByLabel("Email Address").fill(emailAddressRelogin);
    await page.getByLabel("Password", { exact: true }).fill(passwordRelogin);
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page.getByLabel("root - Dashboard")).toBeDefined();
  });
});
