import bcrypt from 'bcrypt';

export async function testGenerateHash() {
  const password = 'b';
  const saltRounds = 10;
  const hashy = await bcrypt.hash(password, saltRounds);
  console.log("hashed: ", hashy)
}

testGenerateHash();

export async function testCompareHash() {
  const inputPassword = 'o';
  let hashedPassword = '$2b$10$VUvJuFsMrh.3SNz74Ux4sebZj3rR5cliyH.mCHod3vcwsdmdTbJn.';

  const isValid = await bcrypt.compare(inputPassword, hashedPassword);
  console.log('Password Comparison Result:', isValid);

}

testCompareHash();
