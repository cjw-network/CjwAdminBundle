<?php // https://github.com/ezsystems/ezpublish-kernel/blob/master/eZ/Publish/Core/REST/Server/Values/LocationList.php

namespace Cjw\AdminAppBundle\Rest\Values;

class LocationList
{
    public $locations;
    public $path;

    public function __construct( array $locations, $path )
    {
        $this->locations = $locations;
        $this->path = $path;
    }
}
