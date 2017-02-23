<?php // https://github.com/ezsystems/ezpublish-kernel/blob/master/eZ/Publish/Core/REST/Server/Values/RestContent.php

namespace Cjw\AdminAppBundle\Rest\Values;

use eZ\Publish\API\Repository\Values\Content\ContentInfo;
use eZ\Publish\API\Repository\Values\Content\Content;
use eZ\Publish\API\Repository\Values\ContentType\ContentType;
use eZ\Publish\API\Repository\Values\Content\Location;

class RestContent
{
    public $contentInfo;
    public $mainLocation;
    public $currentVersion;
    public $contentType;
    public $relations;
    public $path;
    public $languages;

    public function __construct(
        ContentInfo $contentInfo,
        Location $mainLocation = null,
        Content $currentVersion = null,
        ContentType $contentType = null,
        array $relations = null,
        $path = null,
        $languages
    ) {
        $this->contentInfo = $contentInfo;
        $this->mainLocation = $mainLocation;
        $this->currentVersion = $currentVersion;
        $this->contentType = $contentType;
        $this->relations = $relations;
        $this->path = $path;
        $this->languages = $languages;
    }
}
