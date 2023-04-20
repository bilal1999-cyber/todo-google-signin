import prisma from '@/utils/prisma'

export default async function sessionCallback({ session }) {
  const { email, name, image } = session.user

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    session.userId = existingUser.id
    
  } else {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        profileImage: image,
      },
    })

    session.userId = newUser.id
  }

  return session
}