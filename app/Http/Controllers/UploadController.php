<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UploadUrl;
use App\Traits\HttpResponseJson;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Http;


class UploadController extends Controller
{

    use  HttpResponseJson;

    const URL_UPLOAD='https://test.rxflodev.com';

    public function __construct() {
        $this->middleware('auth:api');
    }

    public function getLastFile(){

        return $this->success('Returning object',UploadUrl::orderBy("updated_at",'desc')->first());
    }

    public function uploadFile(Request $request){
        $rules = [
            "image"=>"required|mimetypes:image/png"
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()){
            return $this->error('There were errors on the request',$validator->errors());
        }

        try{
            $client = new \GuzzleHttp\Client();

            $response = $client->post(
                self::URL_UPLOAD,
                [
                    'form_params' => [
                        'imageData' => base64_encode(file_get_contents($request->file('image'))),
                    ]
                ]
            );

            if($response->getStatusCode()!=200){
                return $this->error('There were errors uploading to the storage');
            }
            
            $responseJson = json_decode($response->getBody());
            
            if(!$responseJson){
                return $this->error('Can\'t encode the endpoint output to json');
            }

            if($responseJson->status!="success"){
                return $this->error('The endpoint could not save the file ');
            }
    
            $upload = new UploadUrl();
            $upload->url = $responseJson->url;
    
            if(!$upload->save()){
                return $this->error('There were errors saving to the database');
            }
    
            return $this->success('Image uploaded successfully',$upload);
        }catch(\GuzzleHttp\Exception\ConnectException  $e){
            return $this->error($e->getMessage());
        }
        catch(Exception  $e){
            return $this->error($e->getMessage());
        }

    }
}
