<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class MemberRenewalCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection->map(function ($item) {
                return array_merge($item->toArray(), [
                    'nama_member' => $item->member ? $item->member->nama : '-',
                    'nomor_kartu' => $item->member ? $item->member->nomor_kartu : '-',
                    'operator' => $item->user->name ? $item->user : '-'
                ]);
            })
        ];
    }
}
