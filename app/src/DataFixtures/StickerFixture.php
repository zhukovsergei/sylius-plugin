<?php

namespace App\DataFixtures;

use App\Entity\Sticker\Sticker;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Config\Definition\Builder\ArrayNodeDefinition;

class StickerFixture extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $stickers = [
            ['name' => 'Happy Face', 'image' => 'images/stickers/happy-face.png'],
            ['name' => 'Mem Face', 'image' => 'images/stickers/mem-face.png'],
            ['name' => 'Lolkek Logo', 'image' => 'images/stickers/lolkek-logo.png'],
        ];

        foreach ($stickers as $data) {
            $sticker = Sticker::create($data['name'], $data['image']);

            $manager->persist($sticker);
        }

        $manager->flush();
    }

    public function configureOptions(ArrayNodeDefinition $optionsNode): void
    {
    }

    public function getName(): string
    {
        return 'sticker';
    }
}
