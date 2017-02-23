<?php

namespace Cjw\AdminAppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class AppController extends Controller
{
    public function indexAction()
    {
        return $this->render( 'CjwAdminAppBundle:Default:index.html.twig', array() );
    }
}
