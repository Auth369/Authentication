export const endpoints = {
    users: "/users",
    signUp:"/signUp",
    getProfileData:"/getProfileData",
    signIn:"/signIn",
    randomJoke:"/randomJoke"
}

export const Constants = {
    UserDataAddedSuccess:"User Data added successfully",
    UserDataAddedError:"Unable to add UserData",
    getProfileSuccess:"Profile Data Get Successfully",
    getProfileError:"Unable to get Profile Data",
    invalid: "invalid Credentials",
    signInSuccess:"User SignIn Successfully",
    signInError:"Unable to signIn",
    invalidToken:"Invalid Token",
    Unauthorized:"Unauthorized",
    randomJokeDataSuccess:"Random Joke Data get Successfully",
    randomJokeDataError:"Unable to get Random Joke Data"
}

export type PayloadType = {
    emailId: string;
};
  