<?php

namespace App\Controllers;
use App\Models\CategoriasModel;

class Categorias extends BaseController{
        
    /*=============================================
    Mostrar todos los registros
    =============================================*/     

    public function index(){

        $request = \Config\Services::request(); 
        $headers = $request->getHeaders();

        if(array_key_exists('Authorization', $headers) && !empty($headers['Authorization'])){

            if($request->getHeader('Authorization') == "Authorization: 123abcd"){

                $db = new CategoriasModel();
                $results = $db->findAll();
                
                if(!empty($results)){

                    $json = array(

                        "status"=>200,
                        "total_results"=>count($results),
                        "message"=>$results

                    );

                }else{

                    $json = array(

                        "status"=>404,
                        "total_results"=>0,
                        "message"=>"Ningún registro cargado"

                    );

                }

            }else{

                $json = array(

                    "status" => 500,
                    "total_results" => 0,
                    "message" => "El token es inválido"

                );
            }

        }else{

            $json = array(

                "status" => 500,
                "total_results" => 0,
                "message" => "No tiene permisos para visualizar los registros"

            );

        }

        echo json_encode($json, true);
    
    }
    
    /*=============================================
    Mostrar un sólo registro
    =============================================*/ 

    public function show($id){

        $request = \Config\Services::request(); 
        $headers = $request->getHeaders();

        if(array_key_exists('Authorization', $headers) && !empty($headers['Authorization'])){

            if($request->getHeader('Authorization') == "Authorization: 123abcd"){

                $db = new CategoriasModel();
                $row = $db->find($id);
                
                if(!empty($row)){

                    $json = array(

                        "status"=>200,
                        "total_results"=>1,
                        "message"=>$row

                    );

                }else{

                    $json = array(

                        "status"=>404,
                        "total_results"=>0,
                        "message"=>"Ningún registro cargado"

                    );

                }

              }else{

                $json = array(

                    "status" => 500,
                    "total_results" => 0,
                    "message" => "El token es inválido"

                );
            }

        }else{

            $json = array(

                "status" => 500,
                "total_results" => 0,
                "message" => "No tiene permisos para visualizar los registros"

            );

        }

        echo json_encode($json, true);

    } 


}
