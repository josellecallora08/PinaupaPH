
import img from "../Image/pfp.png";
const TenantProfileInfo = [
  {
    Account:[
      {
        pfp:img,
        username: "John",
        password: "password",
      }
    ],
    PersonalDetails:[
      {
        name: "John Doe",
        email: "joe@me.com",
        contact: "1234567890",
        birthday: "2022-01-01",
      }
    ],
    ApartmentDetails:[
      {
        aparmentunit: "Unit 1",
        deposit: "100",
        dateofmovein: "2022-01-01",
      }
    ],
    FamilyMembers:[
      {
        name: "Jane Doe",
        relationship: "Sibling",
        phone: "1234567890",
      }
    ],
    Pets:[
      {
        name: "Arfie",
        species: "Dog",
        age: "2",
      }
    ]
  }
]
export default TenantProfileInfo;