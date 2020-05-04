<?php


namespace App\Validator;


interface RequestDTOInterface
{
    public function __construct(Request $request);
}
