-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Games" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "autor" TEXT NOT NULL,
    "produtora" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genero" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GamesToProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GamesToGenero" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Games_id_key" ON "Games"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Genero_id_key" ON "Genero"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToProfile_AB_unique" ON "_GamesToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToProfile_B_index" ON "_GamesToProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToGenero_AB_unique" ON "_GamesToGenero"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToGenero_B_index" ON "_GamesToGenero"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToProfile" ADD CONSTRAINT "_GamesToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToProfile" ADD CONSTRAINT "_GamesToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToGenero" ADD CONSTRAINT "_GamesToGenero_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToGenero" ADD CONSTRAINT "_GamesToGenero_B_fkey" FOREIGN KEY ("B") REFERENCES "Genero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
