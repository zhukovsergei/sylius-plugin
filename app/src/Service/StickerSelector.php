<?php

namespace App\Service;

use App\Repository\StickerRepository;

class StickerSelector
{

    public function __construct(
        private readonly StickerRepository $stickerRepository
    )
    {
    }

    public function getRandomSticker()
    {
        return $this->stickerRepository->findRandomSticker();
    }
}
