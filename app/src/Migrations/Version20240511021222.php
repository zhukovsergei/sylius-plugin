<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240511021222 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Adds stickers table to the database.';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE stickers (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(100) NOT NULL, image VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE stickers');
    }
}
