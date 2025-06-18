import getUserInformation from "../utils/userInfoUtils";

describe("getUserInformation", () => {
  it("should return user information", async () => {
    const userId = 1;
    const userInformation = await getUserInformation(userId);
    expect(userInformation).toBeDefined();
  });

  it("should not return user information because of wrong user ID", async () => {
    const userId = 999999;
    const userInformation = await getUserInformation(userId);
    expect(userInformation).toBeUndefined();
  });
});
