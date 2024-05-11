<?php

namespace App\EventListener;

use App\Entity\Order\OrderItem;
use App\Service\StickerSelector;
use Sylius\Component\Core\Model\OrderItemInterface;
use Sylius\Component\Order\Model\OrderInterface;
use Sylius\Component\Order\Processor\OrderProcessorInterface;

class CartListener implements OrderProcessorInterface
{

    public function __construct(
        private readonly StickerSelector $stickerSelector
    )
    {
    }

    public function process(OrderInterface $order): void
    {
        $sticker = $this->stickerSelector->getRandomSticker();

        $stickerItem = $this->createOrderItemForSticker($sticker);
        $order->addItem($stickerItem);
    }

    private function createOrderItemForSticker($sticker): OrderItemInterface
    {
        $orderItem = new OrderItem();
//        $orderItem->setVariant($sticker); Implement all interfaces?
        $orderItem->setUnitPrice(0);

        return $orderItem;
    }
}
