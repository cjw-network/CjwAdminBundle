<?php

namespace Cjw\AdminAppBundle\Rest\Values;

use eZ\Publish\API\Repository\Values\Content\Content;
use eZ\Publish\API\Repository\Values\ContentType\ContentType;
//use eZ\Publish\Core\REST\Common\Value as RestValue;

class Version
{
    public $content;

    public $contentType;

    public $relations;

    public $path;

    public $languages;

    public function __construct(Content $content, ContentType $contentType, array $relations, $path = null, $languages = null)
    {
        $this->content = $content;
        $this->contentType = $contentType;
        $this->relations = $relations;
        $this->path = $path;
        $this->languages = $languages;
    }
}
