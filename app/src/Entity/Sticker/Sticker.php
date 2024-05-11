<?php

namespace App\Entity\Sticker;

use App\Repository\StickerRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: StickerRepository::class)]
#[ORM\Table(name: 'stickers')]
class Sticker
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $image = null;


    public static function create(string $name, string $image): self
    {
        $m = new static();
        $m->name = $name;
        $m->image = $image;
        return $m;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }
}
