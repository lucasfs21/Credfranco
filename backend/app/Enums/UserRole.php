<?php

namespace App\Enums;

enum UserRole: int
{
    case COMMERCIAL = 1;
    case FINANCIAL = 2;

    public function label(): string
    {
        return match ($this) {
            self::COMMERCIAL => 'Commercial',
            self::FINANCIAL => 'Financial'
        };
    }
}