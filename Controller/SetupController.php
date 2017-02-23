<?php

namespace Cjw\AdminAppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Yaml\Yaml;

class SetupController extends Controller
{
    public function indexAction()
    {
        $response = array();  // ToDo return 401

        return new JsonResponse( $response );
    }
}
