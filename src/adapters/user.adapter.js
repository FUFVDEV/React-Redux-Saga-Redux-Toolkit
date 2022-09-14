export const inputUserAdapter = user => ({
  id: user.id,
  userName: user.username,
  firstName: user.firstName,
  lastName: user.lastName,
  age: user.age,
  gender: user.gender,
  email: user.email,
  phone: user.phone,
  address: user.address.address || user.address,
  city: user.address.city,
  company: user.company.name || user.company,
  image: user.image,
});

export const ouputUserAdapter = user => ({
  id: user.id,
  username: user.userName,
  firstName: user.firstName,
  lastName: user.lastName,
  age: user.age,
  gender: user.gender,
  email: user.email,
  phone: user.phone,
  address: {
    address: user.address,
    city: user.city,
  },
  company: {
    name: user.company,
  },
  image: user.image,
});
