<?php

namespace Cjw\AdminAppBundle\Rest\Values;

use eZ\Publish\API\Repository\Values\Content\Location;

class RestLocation
{
    public $location;
    public $childCount;
    public $canEdit;
    public $canCreate;
    public $canRemove;
    public $canMove;

    public function __construct( Location $location, $childCount, $canEdit, $canCreate, $canRemove, $canMove )
    {
        $this->location = $location;
        $this->childCount = $childCount;
        $this->canEdit = $canEdit;
        $this->canCreate = $canCreate;
        $this->canRemove = $canRemove;
        $this->canMove = $canMove;
    }
}
