const bcrypt = require("bcrypt");
const saltRounds = 16;

async function encrypt(plainTextPassword) {
  // This hash will change each time it's generated!
  // That's one of the wonderful things about bcrypt -- even
  // though the has changes, you can still compare the unhashed version
  // successfully
  const hash = await bcrypt.hash(plainTextPassword, saltRounds);
  return hash;
}

async function decrypt(hash, userPassword) {
    compareTo = await bcrypt.compare(userPassword, hash);
    return compareTo;
}

main();